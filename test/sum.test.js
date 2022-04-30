const { sendTicketStatus } = require('../Code');

test('doPost to call sendText', () => {
    const data = {
        "update_id": 278535530,
        "message": {
            "message_id": 127,
            "from": {
                "id": 1495064421,
                "is_bot": false,
                "first_name": "Ridhos",
                "username": "kurakurakecils",
                "language_code": "en"
            },
            "chat": {
                "id": -1001686418744,
                "title": "BLT",
                "username": "bltGroup",
                "type": "supergroup"
            },
            "date": 1651256836,
            "text": "/cek MOBAN-1651256786569",
            "entities": [
                {
                    "offset": 0,
                    "length": 4,
                    "type": "bot_command"
                }
            ]
        }
    };
    const result = sendTicketStatus(data);

    expect(result).toBe(3);
});
