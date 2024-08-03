const express = require('express');
const router = express.Router();
const voucherController = require('../controllers/voucherController');

router.post('/vouchers', async (req, res) => {
  try {
    const { expiryDate, dataLimit } = req.body;

    // Basic input validation
    if (!expiryDate || !dataLimit) {
      return res.status(400).json({ message: 'Expiry date and data limit are required' });
    }

    await voucherController.createVoucher(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating voucher' });
  }
});

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/create-voucher', (req, res) => {
  res.render('createVoucher');
});

router.get('/vouchers', async (req, res) => {
  try {
    const vouchers = await Voucher.find();
    res.render('vouchers', { vouchers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching vouchers' });
  }
});

router.get('/validate-voucher', (req, res) => {
  res.render('validateVoucher');
});


  