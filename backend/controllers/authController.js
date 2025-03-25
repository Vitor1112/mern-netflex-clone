import { User } from "../models/userModel.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import validationCreate from "../Validations/validationCreate.js";
import bcryptjs from "bcryptjs";
import validationLogin from "../Validations/validationLogin.js";

// Dados do usuário/ Login/ Signup/ logout

export  const signup = async (req, res) =>{
   try {

      const data = await validationCreate.validate(req.body, { abortEarly: false });

      // verificar se o email
     const emailExist = await User.findOne({ email: data.email });
     if(emailExist){
         return res.status(400).send({sucess:false , message: "E-mail already exist" });
     }
     // verificar se o username
     const userExist = await User.findOne({ username: data.username });
     if(userExist){
         return res.status(400).send({sucess:false , message: "user already exist" });
     }
 
     // Hash da senha
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(data.password, salt);


     //  Seleciona um avatar aleatório
    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

     // Criar o usuário   fazer  corrção é new user 
     const newUser= new User({
        ...data,
        password: hashedPassword,
         image
        });

     // Verificar se o existe dados no newUser , faça  isso embaixo          
    
        generateTokenAndSetCookie(res, newUser._id);
      

        // Salvar o usuário no banco de dados
        await newUser.save(); 
   
    
 // Enviar resposta e remover a senha do objeto
     res.status(201).json({
        success: true,
        user: { ...newUser._doc, password: "" },
      });
    
    
   } catch (error) {
     console.log(error);
     return res.status(500).json({ message: 'Internal Server Error', error});
    
   } 

}
export  const login = async (req, res) =>{
    try {
        const  data = await validationLogin.validate(req.body);

        // Verificar se o email existe         
        // vem junto com user todos dados do usuario
        const user = await User.findOne({ email: data.email });
        if (!user) {
            return res.status(400).json({success: false, message: "Invalid email or password"});
        }

        // Verificar se a senha está correta
        const isPasswordCorrect = await bcryptjs.compare(data.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "invalid credentials" });
        }        
        // Gerar token e enviar para o cliente
    
         generateTokenAndSetCookie(res, user._id);
    
        
         // Retornar o token para o cliente dentro res. na header
         res.status(200).json({
            success: true,
            user: { ...user._doc, password: "" },
          });

    } catch (error) {
        console.log("Error in login controller ", error);
        return res.status(400).json(error);
        
    }

}
export  const logout = async (req, res) =>{
    try {
        res.clearCookie("jwt-netflix");
        return res.status(200).json({success: true, message: "Logout successfully"});
    
    } catch (error) {
        console.log("Error in logout  controtroller ", error);
        return res.status(500).json({success: false, message: "Internal Server Error"});
        
    }
} 
// verificar se o usuário está autenticado e retornar os dados do usuário autenticado.
export  const authCheck = async (req, res) =>{
    try {
       
        res.status(200).json({success: true, user: req.user});
    
    } catch (error) {
        console.log("Error in authCheck  controtroller ", error);
        return res.status(500).json({success: false, message: "Internal Server Error"});
        
    }}