from yellowbrick.text import TSNEVisualizer
from sklearn.feature_extraction.text import TfidfVectorizer
import json

if __name__ == '__main__':

	with open("./message.json", "r") as f:
		jsonObj = json.loads(f.read())
		messages = jsonObj["messages"]
		tfidf  = TfidfVectorizer()

		data = []
		target = []
		
		for msg in range(500) :
			try:
				message = messages[msg]
				data.append(message["content"])
				target.append(message["sender_name"])
			except:
				print('fail')

		print(len(data)) 
		docs = tfidf.fit_transform(data)
		labels = target

		tsne = TSNEVisualizer()
		tsne.fit(docs, labels)
		tsne.poof()
