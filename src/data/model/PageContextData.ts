// Add resultData here later, right now it's still prop drilling
interface DetailPageContextType {
    putData: (newData: any) => Promise<boolean>,
};

// Global context for user's data
interface UserDataContextType {
    userData: UserData;
};