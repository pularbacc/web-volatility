
#if __name__ == "__main__":
#	volatility3.cli.main("cridex.vmem", "windows.info.Info")


import asyncio
from websockets import connect
import json
import volatility3.cli

async def main(uri):
    async with connect(uri) as websocket:
        await websocket.send(json.dumps({
			"action": "INIT_VOL"
		}))
        while True:
            dataStr = await websocket.recv()
            data = json.loads(dataStr)
            print("---> message from server ", data)

            if(data['action']):
                if(data['action'] == "RUN_COMMAND"):
                    data = data['data']

                    image = data['image']
                    command = data['command']

                    print("run :", image, command)

                    result = volatility3.cli.main(image, command)

                    print("-------> result ", result)

                    await websocket.send(json.dumps({
                        "action": "RESULT_COMMAND",
                        "data": result
                    }))
                    
          
print("running")
asyncio.run(main('ws://localhost:5002'))
