echo "registering with not enough keys"

curl -X POST -d '{"mod": "FM","call": "JA1YXP","rrst": "59","rcvd": "13M","srst": "59","sent": "10M","pts": 1,"pw": "M","memo": "memo"}' http://localhost:8090/register
