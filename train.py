from textgenrnn import textgenrnn

textgen = textgenrnn()

textgen.train_from_file('./data/100010343169828.txt', num_epochs = 5)

textgen.generate()