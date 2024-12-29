// export class Authenication {
//   async login(req: Request, res: Response) {
//     try {
//       const { email, password } = req.body;

//       // Validate input
//       if (!email || !password) {
//         return res.status(400).json({
//           success: false,
//           message: 'Email and password are required'
//         });
//       }

//       // Find user
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(401).json({
//           success: false,
//           message: 'Invalid credentials'
//         });
//       }

//       // Verify password
//       const isMatch = await user.comparePassword(password);
//       if (!isMatch) {
//         return res.status(401).json({
//           success: false,
//           message: 'Invalid credentials'
//         });
//       }

//       // Generate JWT token
//       const token = jwt.sign(
//         { userId: user._id },
//         JWT_SECRET,
//         { expiresIn: '24h' }
//       );

//       // Return success response
//       res.status(200).json({
//         success: true,
//         data: {
//           token,
//           user: {
//             id: user._id,
//             email: user.email
//           }
//         }
//       });
//     } catch (error) {
//       console.error('Login error:', error);
//       res.status(500).json({
//         success: false,
//         message: 'Internal server error'
//       });
//     }
//   }
// }
