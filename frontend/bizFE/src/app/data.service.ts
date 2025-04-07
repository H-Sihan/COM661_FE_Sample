import { Observable } from 'rxjs';
import jsonData from '../assets/bizDB.biz.json';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataService{

    //after displaying data
    pageSize: number = 5;

    constructor(private http: HttpClient) { }

    getBusinesses (page: number){
        //after displaying data
        let pageStart = (page -1) * this.pageSize;
        let pageEnd = pageStart + this.pageSize;

        return jsonData.slice(pageStart, pageEnd);
    }

    getLastPageNumber(){
        return Math.ceil(jsonData.length / this.pageSize);
    }

    getBusiness (id: any){
        let dataToReturn: any[] = [];
        jsonData.forEach(function(business){
            if (business['_id']['$oid'] == id){
                dataToReturn.push(business)
            }
        })
        return dataToReturn;
    }

    getLoremIpsum(paragraphs: number): Observable<any>{
        let API_key = 'YOUR_API_KEYS';
        return this.http.get<any>(
            'https://api.api-ninjas.com/v1/loremipsum?paragraphs=' + paragraphs,
            {headers: {'X-Api-Key': API_key}}
        );
    }

    populateReview() {
        let loremIpsum = <String>"";
        let dummyReview = <any>{};

        this.getLoremIpsum(1).subscribe((response: any) => {
            loremIpsum = response.text;

            jsonData.forEach(function(business){
                let numReview = Math.floor(Math.random() * 10);
                for (var i = 0; i < numReview; i++) {
                    let textSize = Math.floor(Math.random() * 290 + 10);
                    let textStart = Math.floor(Math.random() * 
                        (loremIpsum.length - textSize));
                    
                    dummyReview = {
                        'username' : 'User ' + Math.floor(Math.random() * 9999 + 1),
                        'comment' : loremIpsum.slice(textStart, textStart + textSize),
                        'star' : Math.floor(Math.random() * 5) + 1
                    };
                    business['reviews']?.push(dummyReview);
                }
            })
        })
    }
}
