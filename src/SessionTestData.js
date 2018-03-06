const SessionTestAPI = {

    sessions: [
        {
            "Id": 1,
            "Name": "Test112313213123",
            "User": "testUSER3243243245325",
            "StartTime": 0,
            "StopTime": 0
        },
        {
            "Id": 2,
            "Name": "tewrrewrew##",
            "User": "User mand",
            "StartTime": 0,
            "StopTime": 0
        }
    ], all: function() { return this.sessions},
    get: function(id) {
        const isSession = s => s.Id === id;
        return this.sessions.find(isSession)
    }
};


export default SessionTestAPI;