const router = express.Router();

router.use("/", (req, res) => {
	res.send("Welcome to ParcelPintar");
});

module.exports = router;
