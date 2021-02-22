

const storeState = function(toChange,data){
	var state = {
	items:null,
	item:null,
	};
	if (toChange !== undefined && data !== undefined) {
	state[toChange] = data;
	}
	return state;
};
export default storeState;