import Rx from 'rxjs/Rx';
import RxDataSink from '../dataSinks/RxDataSink';

export const ERROR = 'Error';
export const SUCCESS = 'Success';
const DOMAIN_EVENT_TYPES = [RxDataSink.DATA_ERROR, RxDataSink.DATA_ERROR_CLEARED, RxDataSink.ROW_ADDED, RxDataSink.ROW_UPDATED, RxDataSink.ROW_REMOVED, RxDataSink.DATA_RESET, RxDataSink.SNAPSHOT_COMPLETE,ERROR, SUCCESS ];

Rx.Observable.prototype.timeoutWithError = function (timeout, error) {
  return this.timeoutWith(timeout, Rx.Observable.throw(error));
};

const checkForErrorEventTypes = (ev) => {
  if (ev.Type ===  RxDataSink.SCHEMA_ERROR){
    return Rx.Observable.throw(new Error('Subscription failed as there is a schema error on the server side'));
  }
  if (ev.Type ===  RxDataSink.CONFIG_ERROR){
    return Rx.Observable.throw(new Error('Subscription failed as there is a config error on the server side'));
  }
  return Rx.Observable.of(ev);
};

Rx.Observable.prototype.waitForSnapshotComplete = function (timeout = 10000) {
  return this.filter(ev => !!~[RxDataSink.SNAPSHOT_COMPLETE, RxDataSink.SCHEMA_ERROR,  RxDataSink.CONFIG_ERROR].indexOf(ev.Type))
    .take(1)
    .flatMap(c => checkForErrorEventTypes(c))
    .timeoutWithError(timeout, new Error(`No snapshot complete event detected ${timeout} millis seconds after update`));
};

Rx.Observable.prototype.waitForSuccess = function (timeout = 10000) {
  return this.filter(ev => SUCCESS === ev.Type || ERROR === ev.Type)
    .take(1)
    .timeoutWithError(timeout, new Error('No success or error detected within 10 seconds'))
    .map(ev => {
      if(ev.Type === ERROR){
        throw new Error(ev.error)
      }
      return ev;
    });
};

Rx.Observable.prototype.filterRowEvents = function () {
  return this.filter(ev => !!~DOMAIN_EVENT_TYPES.indexOf(ev.Type));
};

Promise.prototype.timeoutWithError = function(timeout, error){
  return Rx.Observable.fromPromise(this).take(1).timeoutWithError(timeout, error).toPromise();
};
