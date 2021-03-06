export default class Logger {
  static LogLevels = {
    Error: {
      level: 0,
      label: 'Error'
    },
    Warning: {
      level: 1,
      label: 'Warning'
    },
    Info: {
      level: 2,
      label: 'Info'
    },
    Debug: {
      level: 3,
      label: 'Debug'
    },
    Fine: {
      level: 4,
      label: 'Fine'
    }
  };

  static LogLevel = 2;

  static log(logLevel, message, json){
    if (logLevel.level <= Logger.LogLevel) {
      const dateTime = new Date();
      message = '[' + logLevel.label + ' ' +
        dateTime.getHours() + ':' + dateTime.getMinutes() + ':' + dateTime.getSeconds() + ':' + dateTime.getMilliseconds() +
        '] ' + message;

      Logger.output(logLevel, message);

      if (json) {
        Logger.output(logLevel, json);
      }
    }
  }

  static output(logLevel, message) {
    if (logLevel === Logger.LogLevels.Error) {
      console.error(message);
    } else {
      console.log(message);
    }
  }

  static debug(message, json){
    Logger.log(Logger.LogLevels.Debug, message, json);
  }
  static info(message, json){
    Logger.log(Logger.LogLevels.Info, message, json);
  }
  static error(message, json){
    Logger.log(Logger.LogLevels.Error, message, json);
  }
  static warning(message, json){
    Logger.log(Logger.LogLevels.Warning, message, json);
  }
  static fine(message, json){
    Logger.log(Logger.LogLevels.Fine, message, json);
  }
  static sendServerSideError(error){
    Logger.log(Logger.LogLevels.Error, `Cannot send error ${error} to server as server side error logger has not been assigned`);
  }
  static sendServerSideLog(level, message){
    Logger.log(Logger.LogLevels.Error, `Cannot send log ${message} to server as server side error logger has not been assigned`);
  }

  static isFineEnabled(){
    return Logger.LogLevels.Fine <= Logger.LogLevel;
  }
  static isDebugEnabled(){
    return Logger.LogLevels.Debug <= Logger.LogLevel;
  }
  static isInfoEnabled(){
    return Logger.LogLevels.Info <= Logger.LogLevel;
  }
}
