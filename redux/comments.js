import * as ActionTypes from './ActionTypes';

export const comments = (state = { errMess: null, comments:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return {...state, errMess: null, comments: action.payload};

    case ActionTypes.ADD_COMMENT:
      // var comment = action.payload;
      const id = state.comments.length;
      // comment.id = state.comments.length;
      // return state.comments.concat(comment);
      const comment = {...action.payload, id: id}
      const newComments = state.comments.concat(comment);
        return {...state, comments: newComments}
  

    case ActionTypes.COMMENTS_FAILED:
      return {...state, errMess: action.payload};

    default:
      return state;
  }
};