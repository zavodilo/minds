var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var http_1 = require('http/http');
var upload_1 = require('src/services/api/upload');
var client_1 = require('src/services/api/client');
var Capture = (function () {
    function Capture(upload, client, http) {
        this.upload = upload;
        this.client = client;
        this.http = http;
        this.uploads = [];
        this.postMeta = {};
        this.domListeners();
    }
    Capture.prototype.domListeners = function () {
    };
    Capture.prototype.uploadFile = function () {
        var self = this;
        var data = {
            guid: null,
            state: 'created',
            progress: 0
        };
        var fileInfo = document.getElementById("file").files[0];
        if (fileInfo.type.indexOf('image') > -1) {
            data.type = "image";
        }
        else if (fileInfo.type.indexOf('video') > -1) {
            data.type = "video";
        }
        else if (fileInfo.type.indexOf('audio') > -1) {
            data.type = "audio";
        }
        else {
            data.type = "unknown";
        }
        data.name = fileInfo.name;
        var index = this.uploads.push(data) - 1;
        this.upload.post('api/v1/archive', [fileInfo], data, function (progress) {
            console.log('progress update');
            console.log(progress);
            self.uploads[index].progress = progress;
        })
            .then(function (response) {
            console.log(response, response.guid);
            self.uploads[index].guid = response.guid;
            self.uploads[index].state = 'uploaded';
            self.uploads[index].progress = 100;
        })
            .catch(function (e) {
            console.error(e);
        });
    };
    Capture.prototype.modify = function (index) {
        var self = this;
        var promise = new Promise(function (resolve, reject) {
            if (self.uploads[index].guid) {
                resolve();
                return;
            }
            var interval = setInterval(function () {
                if (self.uploads[index].guid) {
                    resolve();
                    clearInterval(interval);
                }
            }, 1000);
        });
        promise.then(function () {
            self.client.post('api/v1/archive/' + self.uploads[index].guid, self.upload[index])
                .then(function (response) {
                console.log('response from modify', response);
            });
        });
    };
    Capture = __decorate([
        angular2_1.Component({
            selector: 'minds-capture',
            viewBindings: [upload_1.Upload, client_1.Client, http_1.Http]
        }),
        angular2_1.View({
            templateUrl: 'templates/capture/capture.html',
            directives: [angular2_1.NgFor, angular2_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [upload_1.Upload, client_1.Client, http_1.Http])
    ], Capture);
    return Capture;
})();
exports.Capture = Capture;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb250cm9sbGVycy9jYXB0dXJlL2NhcHR1cmUudHMiXSwibmFtZXMiOlsiQ2FwdHVyZSIsIkNhcHR1cmUuY29uc3RydWN0b3IiLCJDYXB0dXJlLmRvbUxpc3RlbmVycyIsIkNhcHR1cmUudXBsb2FkRmlsZSIsIkNhcHR1cmUubW9kaWZ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHlCQUF3RCxtQkFBbUIsQ0FBQyxDQUFBO0FBQzVFLHFCQUE4QixXQUFXLENBQUMsQ0FBQTtBQUUxQyx1QkFBdUIseUJBQXlCLENBQUMsQ0FBQTtBQUNqRCx1QkFBdUIseUJBQXlCLENBQUMsQ0FBQTtBQUVqRDtJQWNDQSxpQkFBbUJBLE1BQWNBLEVBQVNBLE1BQWNBLEVBQVNBLElBQVVBO1FBQXhEQyxXQUFNQSxHQUFOQSxNQUFNQSxDQUFRQTtRQUFTQSxXQUFNQSxHQUFOQSxNQUFNQSxDQUFRQTtRQUFTQSxTQUFJQSxHQUFKQSxJQUFJQSxDQUFNQTtRQUgxRUEsWUFBT0EsR0FBZ0JBLEVBQUVBLENBQUNBO1FBQzFCQSxhQUFRQSxHQUFTQSxFQUFFQSxDQUFDQTtRQUdsQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsRUFBRUEsQ0FBQ0E7SUFDdkJBLENBQUNBO0lBRUFELDhCQUFZQSxHQUFaQTtJQUVBRSxDQUFDQTtJQUVERiw0QkFBVUEsR0FBVkE7UUFDRUcsSUFBSUEsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDaEJBLElBQUlBLElBQUlBLEdBQVNBO1lBQ2ZBLElBQUlBLEVBQUVBLElBQUlBO1lBQ1ZBLEtBQUtBLEVBQUVBLFNBQVNBO1lBQ2hCQSxRQUFRQSxFQUFFQSxDQUFDQTtTQUNaQSxDQUFBQTtRQUVEQSxJQUFJQSxRQUFRQSxHQUFHQSxRQUFRQSxDQUFDQSxjQUFjQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUV4REEsRUFBRUEsQ0FBQUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7WUFDdENBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLE9BQU9BLENBQUNBO1FBQ3RCQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFBQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFBQSxDQUFDQTtZQUM3Q0EsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsT0FBT0EsQ0FBQ0E7UUFDdEJBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUFBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUFBLENBQUNBO1lBQzdDQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxPQUFPQSxDQUFDQTtRQUN0QkEsQ0FBQ0E7UUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDTkEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsU0FBU0EsQ0FBQ0E7UUFDeEJBLENBQUNBO1FBRURBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBO1FBRzFCQSxJQUFJQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUV4Q0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxFQUFFQSxDQUFDQSxRQUFRQSxDQUFDQSxFQUFFQSxJQUFJQSxFQUFFQSxVQUFDQSxRQUFRQTtZQUM1REEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxDQUFDQTtZQUMvQkEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7WUFD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b3J0IHsgQ29tcG9uZW50LCBWaWV3LCBOZ0ZvciwgRk9STV9ESVJFQ1RJVkVTIH0gZnJvbSAnYW5ndWxhcjIvYW5ndWxhcjInO1xuaW1wb3J0IHsgSHR0cCwgSGVhZGVycyB9IGZyb20gJ2h0dHAvaHR0cCc7XG5cbmltcG9ydCB7IFVwbG9hZCB9IGZyb20gJ3NyYy9zZXJ2aWNlcy9hcGkvdXBsb2FkJztcbmltcG9ydCB7IENsaWVudCB9IGZyb20gJ3NyYy9zZXJ2aWNlcy9hcGkvY2xpZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWluZHMtY2FwdHVyZScsXG4gIHZpZXdCaW5kaW5nczogWyBVcGxvYWQsIENsaWVudCwgSHR0cCBdXG59KVxuQFZpZXcoe1xuICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9jYXB0dXJlL2NhcHR1cmUuaHRtbCcsXG4gIGRpcmVjdGl2ZXM6IFsgTmdGb3IsIEZPUk1fRElSRUNUSVZFUyBdXG59KVxuXG5leHBvcnQgY2xhc3MgQ2FwdHVyZSB7XG5cbiAgdXBsb2FkcyA6IEFycmF5PGFueT4gPSBbXTtcbiAgcG9zdE1ldGEgOiBhbnkgPSB7fTsgLy9UT0RPOiBtYWtlIHRoaXMgb2JqZWN0XG5cblx0Y29uc3RydWN0b3IocHVibGljIHVwbG9hZDogVXBsb2FkLCBwdWJsaWMgY2xpZW50OiBDbGllbnQsIHB1YmxpYyBodHRwOiBIdHRwKXtcbiAgICB0aGlzLmRvbUxpc3RlbmVycygpO1xuXHR9XG5cbiAgZG9tTGlzdGVuZXJzKCl7XG5cbiAgfVxuXG4gIHVwbG9hZEZpbGUoKXtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGRhdGEgOiBhbnkgPSB7XG4gICAgICBndWlkOiBudWxsLFxuICAgICAgc3RhdGU6ICdjcmVhdGVkJyxcbiAgICAgIHByb2dyZXNzOiAwXG4gICAgfVxuXG4gICAgdmFyIGZpbGVJbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaWxlXCIpLmZpbGVzWzBdO1xuXG4gICAgaWYoZmlsZUluZm8udHlwZS5pbmRleE9mKCdpbWFnZScpID4gLTEpe1xuICAgICAgZGF0YS50eXBlID0gXCJpbWFnZVwiO1xuICAgIH0gZWxzZSBpZihmaWxlSW5mby50eXBlLmluZGV4T2YoJ3ZpZGVvJykgPiAtMSl7XG4gICAgICBkYXRhLnR5cGUgPSBcInZpZGVvXCI7XG4gICAgfSBlbHNlIGlmKGZpbGVJbmZvLnR5cGUuaW5kZXhPZignYXVkaW8nKSA+IC0xKXtcbiAgICAgIGRhdGEudHlwZSA9IFwiYXVkaW9cIjtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YS50eXBlID0gXCJ1bmtub3duXCI7XG4gICAgfVxuXG4gICAgZGF0YS5uYW1lID0gZmlsZUluZm8ubmFtZTtcbiAgICAvL2ZpbGUuZmlsZSA9IGZpbGVJbmZvO1xuXG4gICAgbGV0IGluZGV4ID0gdGhpcy51cGxvYWRzLnB1c2goZGF0YSkgLSAxO1xuXG4gICAgdGhpcy51cGxvYWQucG9zdCgnYXBpL3YxL2FyY2hpdmUnLCBbZmlsZUluZm9dLCBkYXRhLCAocHJvZ3Jlc3MpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdwcm9ncmVzcyB1cGRhdGUnKTtcbiAgICAgIGNvbnNvbGUubG9nKHByb2dyZXNzKTtcbiAgICAgIHNlbGYudXBsb2Fkc1tpbmRleF0ucHJvZ3Jlc3MgPSBwcm9ncmVzcztcbiAgICAgIH0pXG5cdFx0XHRcdC50aGVuKChyZXNwb25zZSA6IGFueSkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLCByZXNwb25zZS5ndWlkKTtcbiAgICAgICAgICBzZWxmLnVwbG9hZHNbaW5kZXhdLmd1aWQgPSByZXNwb25zZS5ndWlkO1xuICAgICAgICAgIHNlbGYudXBsb2Fkc1tpbmRleF0uc3RhdGUgPSAndXBsb2FkZWQnO1xuICAgICAgICAgIHNlbGYudXBsb2Fkc1tpbmRleF0ucHJvZ3Jlc3MgPSAxMDA7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5jYXRjaChmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGUpO1xuXHRcdFx0XHR9KTtcbiAgfVxuXG4gIG1vZGlmeShpbmRleCl7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIC8vd2UgZG9uJ3QgYWx3YXlzIGhhdmUgYSBndWlkIHJlYWR5LCBzbyBrZWVwIGNoZWNraW5nIGZvciBvbmVcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmKHNlbGYudXBsb2Fkc1tpbmRleF0uZ3VpZCl7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZihzZWxmLnVwbG9hZHNbaW5kZXhdLmd1aWQpe1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgfVxuICAgICAgfSwgMTAwMCk7XG4gICAgfSk7XG4gICAgcHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgIHNlbGYuY2xpZW50LnBvc3QoJ2FwaS92MS9hcmNoaXZlLycgKyBzZWxmLnVwbG9hZHNbaW5kZXhdLmd1aWQsIHNlbGYudXBsb2FkW2luZGV4XSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlIDogYW55KSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3BvbnNlIGZyb20gbW9kaWZ5JywgcmVzcG9uc2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=