
import User from '../../models/User'

async function login(req, res) {

    try {
        const { email, password } = req.body;
        const user: any = await User.findByCredentials(email, password);

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        if (user == "invalid-password") {
            return res.status(400).json({ message: "Invalid password" });
        }
        if (user) await user.generateAuthToken();
        console.log(user)

        res.status(200).json({ user: user });



    } catch (error) {
        res.status(400).json(error.message)
    }


}

async function logout(req, res) {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token != req.token;
        });
        await req.user.save();
        console.log('deslogado')
        res.status(200).json({ message: "User disconnected" });
    } catch (error) {
        console.log('catch')
        res.status(500).json(error.message);
    }
}

async function logoutAll(req, res) {
    try {
        req.user.tokens.splice(0, req.user.tokens.length);
        await req.user.save();
        res.status(200).json({ message: "User disconnected on all devices" });
    } catch (error) {
        res.status(500).json(error.message);
    }
}
export default { login, logout, logoutAll }