// src/utils/sendToZapier.js
export const sendToZapier = async (url, bodyData, nextTab, setTab) => {
    try {
        // setTab(nextTab);
        // return true;
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(bodyData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Success:', data);

        // Set the next tab once the request is successful
        setTab(nextTab);
    } catch (error) {
        console.error('Error:', error);
        // Handle the error case, e.g., show an error message to the user
    }
};
