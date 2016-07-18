export function formatTime(seconds) {
    var guide = arguments.length <= 1 || arguments[1] === undefined ? seconds : arguments[1];
    return (function () {
        seconds = seconds < 0 ? 0 : seconds;
        var s = Math.floor(seconds % 60);
        var m = Math.floor(seconds / 60 % 60);
        var h = Math.floor(seconds / 3600);
        var gm = Math.floor(guide / 60 % 60);
        var gh = Math.floor(guide / 3600);

        // handle invalid times
        if (isNaN(seconds) || seconds === Infinity) {
            // '-' is false for all relational operators (e.g. <, >=) so this setting
            // will add the minimum number of fields specified by the guide
            h = m = s = '-';
        }

        // Check if we need to show hours
        h = h > 0 || gh > 0 ? h + ':' : '';

        // If hours are showing, we may need to add a leading zero.
        // Always show at least one digit of minutes.
        m = ((h || gm >= 10) && m < 10 ? '0' + m : m) + ':';

        // Check if leading zero is need for seconds
        s = s < 10 ? '0' + s : s;

        return h + m + s;
    })();
}

export function formatMilliseconds(ms) {
    let hours = Math.floor(ms / 3600000) + ''; // 1 Hour = 36000 Milliseconds
    let minutes = Math.floor((ms % 3600000) / 60000) + ''; // 1 Minutes = 60000 Milliseconds
    let seconds = Math.floor(((ms % 360000) % 60000) / 1000) + ''; // 1 Second = 1000 Milliseconds
    if (hours.length === 1) {
        hours = '0' + hours;
    }

    if (minutes.length === 1) {
        minutes = '0' + minutes;
    }

    if (seconds.length === 1) {
        seconds = '0' + seconds;
    }

    if (hours === '00') {
        return `${minutes}:${seconds}`;
    }

    return `${hours}:${minutes}:${seconds}`;
}