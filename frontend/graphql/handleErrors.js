const handleGraphErrors = (e) => {
    if (e.graphQLErrors.length > 0) {
        throw new Error(e.graphQLErrors[0].message);
    }
    if (e.networkError) {
        throw new Error(e.networkError?.result?.errors[0]?.debugMessage);
    }
};

export default handleGraphErrors;
