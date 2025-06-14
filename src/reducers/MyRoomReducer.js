export default async (current, action) => {
    switch (action.type) {
        case "login":
            return action.payload;
        case "logout":
            return null;
    }

    return current;
}