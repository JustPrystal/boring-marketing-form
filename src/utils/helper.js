const updateStepUrl = (tab) => {

    const defaultEmailParam = 'email-submission';
    const customParam = 'details-capture';
    const calendlyParam = 'calendly-book-a-call';


    const currentUrl = window.location.href.split('?')[0];
    const urlParams = new URLSearchParams(window.location.search);

    if (!urlParams.has('action') || urlParams.get('action') !== defaultEmailParam) {
        urlParams.set('action', defaultEmailParam);
    }
    if (tab === 0) {
        urlParams.set('action', defaultEmailParam);

    }
    if (tab === 1) {
        urlParams.set('action', customParam);

    }
    if (tab === 2) {
        urlParams.set('action', calendlyParam);

    }

    const newUrl = `${currentUrl}?${urlParams.toString()}`;


    window.history.pushState({ path: newUrl }, '', newUrl);
}

export {updateStepUrl}