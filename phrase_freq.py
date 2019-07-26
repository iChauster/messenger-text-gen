import json
import nltk
from nltk.util import ngrams
import string
from collections import Counter
import re

phrase_counter = Counter()

non_speaker = re.compile('[A-Za-z]+: (.*)')

def untokenize(ngram):
    tokens = list(ngram)
    return "".join([" "+i if not i.startswith("'") and \
                             i not in string.punctuation and \
                             i != "n't"
                          else i for i in tokens]).strip()

def extract_phrases(text, phrase_counter, length):
    for sent in nltk.sent_tokenize(text):
        strip_speaker = non_speaker.match(sent)
        if strip_speaker is not None:
            sent = strip_speaker.group(1)
        words = nltk.word_tokenize(sent)
        for phrase in ngrams(words, length):
            if all(word not in string.punctuation for word in phrase):
                phrase_counter[untokenize(phrase)] += 1

if __name__ == "__main__":
	with open("./message.json", "r") as f:
		jsonObj = json.loads(f.read())
		messages = jsonObj["messages"]

		wordDict = {}
		
		for msg in range(100000):
			try :
				message = messages[msg]
				text = message["content"]
				extract_phrases(message["content"], phrase_counter, 3)
			except:
				print('')
		most_common_phrases = phrase_counter.most_common(50)
		for k,v in most_common_phrases:
		    print("%s : %s" % (k, v))

	
		