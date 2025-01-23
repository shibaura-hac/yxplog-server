echo "registering without date specified"

curl -X POST -d '{"band": 3.5,"mod": "FM","call": "JA1YXP","rrst": "59","srst": "59","pw": "M","memo": "memo"}' http://localhost:8090/register


# curl -X POST -d '{"band": 3.5,"mod": "FM","call": "JA1YXP","rrst": "59","rcvd": "13M","srst": "59","sent": "10M","pts": 1,"pw": "M","memo": "memo"}' http://localhost:8090/register
