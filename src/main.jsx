import React from 'react';
import { StrictMode } from 'react'
import { createPortal } from "react-dom";
import ReactDOM from "react-dom/client";
import './assets/sass/styles.scss';


/*forms*/
import CompetitorWebsiteScrapperForm from './components/forms/competitorWebsiteScrapper';
import KeywordRankingForm from './components/forms/keywordRankingForm';
import ToolkitForm from './components/forms/toolKitForm';
import SEOCourseForm from './components/forms/seoCourseForm';
/*end-forms*/


// api functions

const sendToZapier = async (url, bodyData, nextTab, setTab) => {
  try {
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


// Portal rendering component
const RenderPortals = () => {
  // Form component
  const competitorWebsiteScrapperRoot = document.getElementById("competitor-website-scrapper-root");
  const keywordRankingRoot = document.getElementById("keyword-ranking-root");
  const toolkitRoot = document.getElementById("toolkit-root");
  const SEOCourseFormRoot = document.getElementById("seo-course-form-root");

  return (
    <>
      {competitorWebsiteScrapperRoot && createPortal(<CompetitorWebsiteScrapperForm />, competitorWebsiteScrapperRoot)}
      {keywordRankingRoot && createPortal(<KeywordRankingForm />, keywordRankingRoot)}
      {toolkitRoot && createPortal(<ToolkitForm />, toolkitRoot)}
      {SEOCourseFormRoot && createPortal(<SEOCourseForm />, SEOCourseFormRoot)}
    </>
  );
};

const App = () => {
  return (
    <div>
      <RenderPortals />
    </div>
  );
};

// Render the App component into the root div
ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
   </StrictMode>
);
