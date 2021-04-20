const axios = require('axios').default;

const environment = 'mypurecloud.ie';
const accessToken = '1crocX-vMp4arI6SDMDExCrQI0w9HIowFfoVfxrS_ZH6iO39YXWmGnO9unbvwkiaY_3a2aVGHR0JAQZ5ayCGcg';
const scriptId = 'dd9ce76a-b4f2-40a6-a6cd-2e99fef04822';

// Get Script
const getScript = async () => {
  try {
    let response = await axios({
      url: `https://api.${environment}/api/v2/scripts/${scriptId}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${accessToken}`,
      },
    });
    //console.log('getScript response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in getScript:', error);
  } finally {
    console.debug('Request complete.');
  }
};

// Get Download URL
const getScriptDownloadUrl = async (scriptId) => {
  try {
    let response = await axios({
      url: `https://api.${environment}/api/v2/scripts/${scriptId}/export`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${accessToken}`,
      },
      data: {
        filename: 'test.script',
      },
    });
    //console.log('getScriptDownloadUrl response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in getScriptDownloadUrl:', error);
  } finally {
    console.debug('Request complete.');
  }
};

// Download script
const downloadScript = async (downloadUrl) => {
  try {
    let response = await axios({
      url: downloadUrl,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    //console.log('downloadScript response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in downloadScript:', error);
  } finally {
    console.debug('Request complete.');
  }
};

const main = async () => {
  let script = await getScript();
  console.log('Script id:', script.id);
  let downloadUrl = await getScriptDownloadUrl(script.id);
  console.log('Download URL:', downloadUrl);
  let scriptContents = await downloadScript(downloadUrl.url);
  console.log('Script contents:', scriptContents);
};

main();
