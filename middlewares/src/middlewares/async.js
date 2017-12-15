export default function ({ dispatch }) {
    return next => action => {
        // If action doesn't have payload
        // or, the payload doesn't have a .then property
        // we don't care about it, send it on
        if (!action.payload || !action.payload.then) {
            return next(action);
        }

        // Make sure the action's promise resolves
        action.payload
            .then(response => {
                // create a new action with the old type, but
                // replace the promise with the response data
                const newAction = { ...action, payload: response };
                dispatch(newAction);
            });
    };
}