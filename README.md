# messenger-text-gen

Hey, the project is going in a bunch of directions. Here's the breakdown:

_trends_ is where you can find data explorations in messages, primarily using tf-idf vectorization as a tool to search, and visually cluster messages (T-SNE). Also looking to see the meta-usage of words/phrases, sort of like what Google has.

*rnn_model* is a WIP of a LSTM model to predict responses of a given person. Still rethinking the structure, especially with the popularity of transformers / autoencoders.

*preprocessing* has some custom written python code to extact counts and frequencies from our corpus.

*model* contains some ways to interface with Facebook's messaging API. We found this less effective than getting an archive. Feel free to download one of your own archives elsewhere to test out some of my work!


