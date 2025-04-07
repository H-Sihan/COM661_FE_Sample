import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { DataService } from '../../../data.service';
import { CommonModule } from '@angular/common';
//npm install @angular/google-maps --save;
import { GoogleMapsModule } from '@angular/google-maps';
import { WebService } from '../../../services/web.services';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';

@Component({
    selector: 'business',
    imports: [RouterOutlet, CommonModule, GoogleMapsModule, ReactiveFormsModule],
    providers: [DataService, WebService],
    templateUrl: './business.component.html',
    styleUrl: './business.component.css'
})
export class BusinessComponent {
    business_list: any
    business_lat: any
    business_lng: any
    map_options: google.maps.MapOptions = {};
    map_locations: any[] = [];
    loremIpsum: any;
    temerature: any;
    weather: any;
    weatherIcon: any;
    weatherIconUrl: any;
    temperatureColor: any;

    review_list: any;
    reviewForm: any

    constructor(public dataService: DataService,
        private route: ActivatedRoute,
        private webService: WebService,
        private formBuilder: FormBuilder,
        public authService: AuthService) { }

    ngOnInit() {

        this.reviewForm = this.formBuilder.group({
            username: ['', Validators.required],
            comment: ['', Validators.required],
            stars: 5
        });
        this.webService.getBusiness(this.route.snapshot.paramMap.get('id'))
            .subscribe((response) => {
                this.business_list = [response];
                this.business_lat = this.business_list[0].location.coordinates[0];
                this.business_lng = this.business_list[0].location.coordinates[1];

                this.map_locations.push({
                    lat: this.business_lat,
                    lng: this.business_lng
                });

                this.map_options = {
                    mapId: "DEMO_MAP_ID",
                    center: {
                        lat: this.business_lat,
                        lng: this.business_lng
                    },
                    zoom: 13
                };

                this.dataService.getLoremIpsum(1)
                    .subscribe((response: any) => {
                        this.loremIpsum = response.text.slice(0, 600);
                    });

                this.webService.getCurrentWeather(this.business_lat, this.business_lng)
                    .subscribe((response: any) => {
                        let weatherResponse = response['weather'][0]['description'];
                        this.temerature = Math.round(response['main']['temp']);
                        this.weather = weatherResponse[0].toUpperCase() +
                            weatherResponse.slice(1);
                        this.weatherIcon = response['weather'][0]['icon'];
                        this.weatherIconUrl = "https://openweathermap.org/img/wn/" +
                            this.weatherIcon + "@4x.png";

                        this.temperatureColor = this.webService.getTemperatureColour(
                            this.temerature);
                    });


            });

        this.webService.getReviews(
            this.route.snapshot.paramMap.get('id'))
            .subscribe((response) => {
                this.review_list = response;
            });


        /*this.business_list = this.dataService.getBusiness(
            this.route.snapshot.paramMap.get('id')

            this.webService.getReviews(
                    this.route.snapshot.paramMap.get('id'))
                    .subscribe((response) => {
                        this.review_list = response;
                    });
        );*/
        //for maps only

    }

    onSubmit() {
        this.webService.postReview(
            this.route.snapshot.paramMap.get('id'),
            this.reviewForm.value)
            .subscribe((response) => {
                this.reviewForm.reset();

                this.webService.getReviews(
                    this.route.snapshot.paramMap.get('id'))
                    .subscribe((response) => {
                        this.review_list = response;
                    });
            })
    };

    isInvalid(control: any) {
        return this.reviewForm.controls[control].invalid &&
            this.reviewForm.controls[control].touched;
    };

    isUntouched() {
        return this.reviewForm.controls.username.pristine &&
            this.reviewForm.controls.comment.pristine;
    }
}
