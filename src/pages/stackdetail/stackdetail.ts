import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, ViewController} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {PROXY} from '../../providers/constants/constants';
import {LinedetailPage} from '../../pages/linedetail/linedetail';
import {OrbsPage} from '../../pages/orbs/orbs';

@Component({
    selector: 'page-stackdetail',
    templateUrl: 'stackdetail.html',
})
export class StackdetailPage {

    cargar = false;
    mensaje = '';
    stack = {
        id: '',
        stack_title: '',
        category: '',
        total_hits: '',
        created_by: '',
        status: '',
        timestamp: '',
    }
    lines = [];
    mostrar = false;
    constructor(private alertCtrl: AlertController, private viewCtrl: ViewController, private http: Http, public navCtrl: NavController, public navParams: NavParams) {

        let self = this;
        let auth = this.navParams.get('item');

        self.http.post(PROXY + '/stack_detail.php', btoa(JSON.stringify(auth))).map(res => res.json()).subscribe(
            data => {//
                var tmp = data;
                //self.mensaje += JSON.stringify(tmp);
                //self.mensaje += JSON.stringify(tmp[0]);
                self.stack = tmp[0];//JSON.parse(data.data[0]);

                self.http.post(PROXY + '/lines.php', btoa(JSON.stringify(auth))).map(res => res.json()).subscribe(
                    data => {//
                        var a = 100;
                        self.cargar = false;
                        var lines = data;
                        for (var key in lines) {
                            self.lines.push({
                                id: lines[key].id,
                                title: lines[key].title,
                                description: lines[key].description,
                                timestamp: new Date(lines[key].timestamp).toDateString(),
                                clase: 'stack_full2',
                                px: a//{{line.px}}
                            });
                            a = a + 40;
                        }
                        while (self.lines.length < 7) {
                            self.lines.push({title: '', timestamp: '', description: '', clase: 'stack_none2', px: a});
                            a = a + 40;
                        }
                    },
                    err => {
                        self.presentAlert('Error!', JSON.stringify(err));
                        self.cargar = false;
                    }
                );

            },
            err => {
                self.presentAlert('Error!', JSON.stringify(err));
                self.cargar = false;
            }
        );
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad StackdetailPage');
    }


    presentAlert(titulo, texto) {
        const alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
    }
    openLine(line) {

        this.navCtrl.push(LinedetailPage, {line: line});
    }
    collapse() {
        this.lines[0].clase = this.lines[0].clase + ' itemSlidingAnimation1';
        this.lines[1].clase = this.lines[1].clase + ' itemSlidingAnimation2';
        this.lines[2].clase = this.lines[2].clase + ' itemSlidingAnimation3';
        this.lines[3].clase = this.lines[3].clase + ' itemSlidingAnimation4';
        this.lines[4].clase = this.lines[4].clase + ' itemSlidingAnimation5';
        this.lines[5].clase = this.lines[5].clase + ' itemSlidingAnimation6';
        this.lines[6].clase = this.lines[6].clase + ' itemSlidingAnimation7';     
    }

    goToOrbs() {
        this.navCtrl.push(OrbsPage);
    }
}
