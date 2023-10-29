const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const admin = require('firebase-admin');
const serviceAccount = {
  type: 'service_account',
  project_id: 'claimkitty-450e5',
  private_key_id: 'e39887e5e2c74c1158f1199cd5565bcfd54c3e71',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC9FjyUiynZ6xCW\nbBfLGCyxsXLKnv0Z6m3PFNWLlUwUrdknp1mUS/Xl5FZ/oqfry9XcbatE+Ja3HLKl\nlE8OpwLUEOQqebLBXaGqRuXrHQ2D8rcO6W4wYYL4mki7xUuRaCVm789T99Tam8Jo\nCQ5M8Nl8t+Ulx6NOQ1kkST+XPBg8ulJWt0EG/QF5CRmUZz+Tx35dMZFObPEqZTS8\nYCLt9M/57cF8WDlSexdhmh7uLHjujGibWW5N33VjqwarKKUXl7eoklkILJmrCNPt\nYC80petYr1zmc+MmIwpuEynmNmC7rsqOEb/+IInLQR6smdsyMn/jCfR4Hxiv3tZ5\ndxz8WXQpAgMBAAECggEAAroMHW6Z/SbsZOWXUeoIlPcUix2lU+cYoR9GtWitrEZV\n3BedTVaWFnQHQk0ablD7cHO9ap/KGUcRlXKGJwAwudWqMKmeHWHoB6sA5vXS4NJS\nd6V/8wnTnW7+JFpj7Kt2OfM0h8cKZlek2KK5dnxqVSfYEbDSEaTGJ5A4hEoNJcJa\nEEhw6NIV7nXhy0zfyuqygDfvmB/mXjvnoAKbHRQa02ujnhJhlD1aks+rF4xZJauX\nJ1cBmhRb0eJokZpwFwvalJp0NJzGmP4vzMJn/zudaOe0Q0DU0X8XF9a+GfY6Zu+w\nfS+V5BJXpTI8LfeLH2zTpCAVhCS6qJZF0fbkk5CY7QKBgQDrYfttCQoNIyZlbeej\n2D/6oLlNxDEUSKpzrfCxh3pWcVRhxG3j/LP+YUfQSWn8wBb3OR0blUZs3yAN5l8U\ntmGCayCl3uOV/+Q+zzJxpQQv11ZyIk5fuj0FkS/GCcJSWd4md0H2LxU2qaYqw5c+\n2R9saOe/IO+UKWfkQ1kmvTjMxQKBgQDNpifsTMZwod8dBShiQCu7jzSeRFOzrCKV\nMpRt2f4rMtTSIPhmjE9DZMvGpoleIcDoKLLv8O2S3owRZIMJ8H9gtF8skDNPWcIP\n/0P+5QpGO7lZNGYkmA2tkeCsyL+IKfHX7YcyB91rlwRhLSSJQn4fKQki+OZMqW0b\nXYoZEMiIFQKBgQDDu0GZBLg//meyVncVzwA8yCPvH+L0DAz5jr2k0pSPh0P03KPI\nvt1p/bj64eFplM5EHFExG6tpYw1DobqU/agODEkkxTiZBiXleORojiDyK22uEQr9\nHWAa3gVM99aIJkTN1cObFMHeJ6qOywBc+a3gt0dmrtuqZ9gFf1+GEDlIRQKBgD8Q\nz3l16f0shwGdTU8kIsU4G4jVp12YUlqy0jYF/h49TmrKVaMNMFmYla1r8QB/FWuc\n35MZraG2wfmre0wXBtkfN3ixGCsjeZHyVGXc05PKSQMEQLbEMp2h+ObEAYi+ZD41\nx5oeM1cFTwCGGYhGbescaILjFa044A7eVrVtIjIpAoGAHR5MxaQcSY3sxnh3M1Rf\nvjw94VkAqXXd4U7UWf/3142ZNfGQ/O8O1OoJN9lIHqamjY5xSHr1FEtNKmOX4Hp0\nFP61BsuMU08DbUvcpcEE9IMva3SX28Xnu1j5+jMqpxx8IBho6qlkI5rl3ZFW3YDJ\nHikHrhLGM6KtaR6u0ae96Xk=\n-----END PRIVATE KEY-----\n',
  client_email:
    'firebase-adminsdk-tfvel@claimkitty-450e5.iam.gserviceaccount.com',
  client_id: '112580678208430694475',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-tfvel%40claimkitty-450e5.iam.gserviceaccount.com',
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://claimkitty-450e5-default-rtdb.firebaseio.com',
});

app.post('/addAirdrop', (req, res) => {
  const data = req.body.data;
  const url = req.body.url;
  admin
    .database()
    .ref(url)
    .set(data)
    .then(() => {
      res.status(200).json({ message: 'Data sent to Firebase' });
    })
    .catch(error => {
      console.error('Error sending data to Firebase:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});
app.get('/airdrops', (req, res) => {
  const url = req.query.url;
  const ref = admin.database().ref(url);
  ref.once(
    'value',
    snapshot => {
      const data = snapshot.val();
      res.json(data);
    },
    error => {
      console.error(error);
      res.status(500).send('Error retrieving data from Firebase');
    },
  );
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
