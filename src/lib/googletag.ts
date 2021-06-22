const googleTagStub = {
    display: () => {},
    enableServices:  () => {},
    pubads:  () => {},
    cmd: [],
};

const getGoogleTag = () =>
    window.googletag || googleTagStub;

export { getGoogleTag };
    