from keras.models import Sequential
from keras.layers import Dense, Activation
from keras.layers import LSTM
from keras.optimizers import RMSprop

def buildModel():
	model = Sequential()
	model.add(LSTM(128, input_shape=(maxlen, len(chars))))
	model.add(Dense(len(chars)))
	model.add(Activation('softmax')) # Not classification, refine output.
	optimizer = RMSprop(lr=0.01)
	model.compile(loss='categorical_crossentropy', optimizer=optimizer)

	return model
def train():
	from keras.callbacks import ModelCheckpoint

	filepath = "weights.hdf5"
	checkpoint = ModelCheckpoint(filepath, monitor='loss',
	                             verbose=1, save_best_only=True,
	                             mode='min')

	rom keras.callbacks import ReduceLROnPlateau
	reduce_lr = ReduceLROnPlateau(monitor='loss', factor=0.2,
	                              patience=1, min_lr=0.001)
	callbacks = [print_callback, checkpoint, reduce_lr]

	model = buildModel()

	# model.fit( decide input representation callbacks = callbacks)

