import React, { useEffect } from 'react';

const CalendlyEmbed = ({tag}) => {
  useEffect(() => {
    // Dynamically load the Calendly external widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    // When the script is loaded, initialize the Calendly widget
    script.onload = () => {
      Calendly.initInlineWidget({
        url: 'https://calendly.com/boringmarketing/boringmarketing-com-30min-demo-call', // Replace with your Calendly URL
        parentElement: document.getElementById('calendly-container'), // Target div by ID
        prefill: {}, // Optional prefill fields
        utm: {} // Optional UTM tracking parameters
      });
    };

    // Clean up the script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);


  useEffect(() => {

    function isCalendlyEvent(e) {
      return e.data.event &&
             e.data.event.indexOf('calendly') === 0;
    };
     
    window.addEventListener(
      'message',
      function(e) {
        if (isCalendlyEvent(e)) {
          console.log(e.data);
          if (e.data.event === 'calendly.event_scheduled') {
            // Fire Facebook Pixel Schedule event when a call is booked
            fbq('track', tag);  // This will fire the "Schedule" event
          }
        }
      }
    );
 

  }, []);



  return (
      <div id="calendly-container" style={{ minHeight: '600px' }}></div>
  
  );
};

export default CalendlyEmbed;
