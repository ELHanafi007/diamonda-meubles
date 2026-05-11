import fetch from 'node-fetch';

const imageUrl = 'https://zdtxoprqyouczborasvf.supabase.co/storage/v1/object/public/product_images/0.780911222204722.jpeg';

async function checkImage() {
  try {
    const response = await fetch(imageUrl);
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    console.log('Headers:', JSON.stringify(response.headers.raw(), null, 2));
    
    if (response.ok) {
      console.log('Image is accessible!');
    } else {
      const text = await response.text();
      console.log('Error Response:', text);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

checkImage();
