import json
import random

def checkMessage(g: str) -> bool:
	if "content" not in g:
		return False
	return True

if __name__ == "__main__":
	with open("./message.json", "r") as f:
		# load data
		jsonObj = json.loads(f.read())
		messages = jsonObj["messages"]

		# seed generator
		random.seed()
		fail = 0
		maxCorrect = 0
		correct = 0

		while not fail:
			validMessages = []
			gIndex = random.randint(5, len(messages))
			g = messages[gIndex]

			# find a starting point
			while not checkMessage(g) or len(g["content"].split()) < 5:
				gIndex = random.randint(5, len(messages))
				g = messages[gIndex]
			
			validMessages.append(g)
			# get context
			while len(validMessages) < 5:
				gIndex -= 1
				if (checkMessage(messages[gIndex])):
					validMessages.append(messages[gIndex])				
			mask = {}
			count = 1
			for i in range(4, -1, -1):
				cmsg = validMessages[i]
				sender, content = cmsg["sender_name"], cmsg["content"]
				if sender not in mask:
					mask[sender] = count
					count += 1
				print("%s : %s" % (mask[sender], content)) 

			print("Who said: %s" % g["content"])
			answer = g["sender_name"].split()[0]
			res = input()
			if res != answer:
				fail = 1
				print("Ooops... It's actually %s" % answer)
				print("Try again? Press 1", end = " ")
				if input() == "1":
					fail = 0
					correct = 0
					print()
			else:
				print("Correct\n")
				correct += 1
				maxCorrect = max(maxCorrect, correct)

		print("%d Correct!" % maxCorrect)
	

