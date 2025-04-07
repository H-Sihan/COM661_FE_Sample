import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class WebService {

    pageSize: number = 4;

    constructor(private http: HttpClient) { }

    getBusinesses(page: number) {
        return this.http.get<any>(
            'http://127.0.0.1:5000/businesses?pn=' + page + '&ps=' + this.pageSize);
    }

    getBusiness(id: any) {
        return this.http.get<any>(
            'http://127.0.0.1:5000/businesses/' + id);
    }

    getCurrentWeather(lat: number, lon: number){
        let API_KEY = 'YOUR_API_KEY';
        return this.http.get<any>(
            'https://api.openweathermap.org/data/2.5/weather?lat=' +
            lat + '&lon=' + lon + '&units=metric&appid=' + API_KEY);
    }

    getTemperatureColour(temp: number){
        if (temp < 5 ) return '#0000ff'; //blue
        else if (temp <= 12) return '#00ff00'; //green
        else if (temp <= 17) return '#ffff00'; //yellow
        else if (temp < 25) return '#ff7f00'; //orange
        else return '#ff0000'; //red
    }

    getReviews(id: any){
        return this.http.get<any>("http://127.0.0.1:5000/businesses/" + id + "/reviews")
    }

    postReview(id: any, review: any){
        let postData = new FormData();
        postData.append("username", review.username);
        postData.append("comment", review.comment);
        postData.append("stars", review.stars);

        return this.http.post<any>(
            'http://127.0.0.1:5000/businesses/' + id + '/reviews',
            postData);
    }
}
