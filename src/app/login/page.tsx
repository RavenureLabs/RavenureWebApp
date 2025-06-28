'use client';
import Image from "next/image";
// import style.css
import './style.css';
import { useEffect } from "react";
import { useSession } from "next-auth/react";
export default function LoginPage() {
    useEffect(() => {
            interface PasswordAccessElements {
                input: HTMLInputElement | null;
                iconEye: HTMLElement | null;
            }

            const passwordAccess = (loginPass: string, loginEye: string): void => {
                const elements: PasswordAccessElements = {
                    input: document.getElementById(loginPass) as HTMLInputElement | null,
                    iconEye: document.getElementById(loginEye)
                };

                if (elements.input && elements.iconEye) {
                    elements.iconEye.addEventListener('click', () => {
                        // Change password to text
                        elements.input!.type === 'password'
                            ? elements.input!.type = 'text'
                            : elements.input!.type = 'password';

                        // Icon change
                        elements.iconEye!.classList.toggle('ri-eye-fill');
                        elements.iconEye!.classList.toggle('ri-eye-off-fill');
                    });
                }
            }
            passwordAccess('password','loginPassword')
            
            interface PasswordRegisterElements {
                input: HTMLInputElement | null;
                iconEye: HTMLElement | null;
            }

            const passwordRegister = (loginPass: string, loginEye: string): void => {
                const elements: PasswordRegisterElements = {
                    input: document.getElementById(loginPass) as HTMLInputElement | null,
                    iconEye: document.getElementById(loginEye)
                };

                if (elements.input && elements.iconEye) {
                    elements.iconEye.addEventListener('click', () => {
                        // Change password to text
                        elements.input!.type === 'password'
                            ? elements.input!.type = 'text'
                            : elements.input!.type = 'password';

                        // Icon change
                        elements.iconEye!.classList.toggle('ri-eye-fill');
                        elements.iconEye!.classList.toggle('ri-eye-off-fill');
                    });
                }
            }
            passwordRegister('passwordCreate','loginPasswordCreate')
            
            const loginAcessRegister = document.getElementById('loginAccessRegister'),
                buttonRegister = document.getElementById('loginButtonRegister'),
                buttonAccess = document.getElementById('loginButtonAccess')
            
            if (buttonRegister && loginAcessRegister) {
                buttonRegister.addEventListener('click', () => {
                    loginAcessRegister.classList.add('active');
                });
            }
            
            if (buttonAccess && loginAcessRegister) {
                buttonAccess.addEventListener('click', () => {
                    loginAcessRegister.classList.remove('active');
                });
            }
    }, []);

    useEffect(() => {
        const loginForm = document.querySelector('.login__access .login__form');
        const registerForm = document.querySelector('.login__register .login__form');

        if (loginForm) {
            loginForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                const email = (document.getElementById('email') as HTMLInputElement).value;
                const password = (document.getElementById('password') as HTMLInputElement).value;

                try {
                    const res = await fetch('http://localhost:3000/api/user', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            action: 'login',
                            data: {
                                email,
                                password
                            }
                        }),
                    });
                    const data = await res.json();
                    if (res.ok && data.success) {
                        window.location.href = "/";
                    } else {
                        alert(data.message || 'Giriş başarısız. Lütfen tekrar deneyin.');
                    }
                } catch (error) {
                    alert('Bir hata oluştu. Lütfen tekrar deneyin.');
                }
            });
        }

        if (registerForm) {
            registerForm.addEventListener('submit', (event) => {
                event.preventDefault();
                // handleRegister is already defined in the previous useEffect
                // @ts-ignore
                handleRegister(event);
            });
        }
    }, []);

    return (
        <div>
    <svg className="login__blob" viewBox="0 0 566 840" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0" mask-type="alpha">
           <path d="M342.407 73.6315C388.53 56.4007 394.378 17.3643 391.538 
           0H566V840H0C14.5385 834.991 100.266 804.436 77.2046 707.263C49.6393 
           591.11 115.306 518.927 176.468 488.873C363.385 397.026 156.98 302.824 
           167.945 179.32C173.46 117.209 284.755 95.1699 342.407 73.6315Z"/>
        </mask>
     
        <g mask="url(#mask0)">
           <path d="M342.407 73.6315C388.53 56.4007 394.378 17.3643 391.538 
           0H566V840H0C14.5385 834.991 100.266 804.436 77.2046 707.263C49.6393 
           591.11 115.306 518.927 176.468 488.873C363.385 397.026 156.98 302.824 
           167.945 179.32C173.46 117.209 284.755 95.1699 342.407 73.6315Z"/>
     
           <image className="login__img" href="/Wall.jpg"/>
        </g>
     </svg>   
        
     <div className="login container grid" id="loginAccessRegister">
        <div className="login__access">
           <div className="login__area">
            <div className="login__header">
                <Image
                    src="/logo.png"
                    alt="Phoenix Studio Logo"
                    width={100}
                    height={100}
                    className="login__logo"
                    onClick={() => window.location.href = '/'}
                />
                <h1>Phoenix Studio'ya giriş yap</h1>
            </div>
              <form action="" className="login__form">
                 <div className="login__content grid">
                    <div className="login__box">
                       <input type="email" id="email" required placeholder=" " className="login__input" />
                       <label htmlFor="email" className="login__label">E-posta</label>
           
                       <i className="ri-mail-fill login__icon"></i>
                    </div>
        
                    <div className="login__box">
                       <input type="password" id="password" required placeholder=" " className="login__input" />
                       <label htmlFor="password" className="login__label">Şifre</label>
           
                       <i className="ri-eye-off-fill login__icon login__password" id="loginPassword"></i>
                    </div>
                 </div>
        
                 <a href="#" className="login__forgot">Şifrenizi mi unuttunuz?</a>
        
                 <button type="submit" className="login__button">Giriş yap</button>
              </form>
     
              <div className="login__social">
                 <p className="login__social-title">veya şununla giriş yapın</p>
     
                 <div className="login__social-links">
                    <a href="#" className="login__social-link">
                       <img src="/google.svg" alt="image" className="login__social-img" />
                    </a>
                    <a href="#" className="login__social-link">
                        <img src="/discord.svg" alt="image" className="login__social-img" />
                     </a>
                 </div>
              </div>
     
              <p className="login__switch">
                Hesabınız yok mu? 
                 <button id="loginButtonRegister">Hesap oluştur</button>
              </p>
              <p className="footer__text">© 2025 Phoenix Studio. Tüm hakları saklıdır.</p>
           </div>
        </div>
        <div className="login__register">
            <div className="login__area">
                <div className="login__header">
                    <img src="/logo.png" alt="Phoenix Studio Logo" className="login__logo" />
                    <h1>Phoenix Studio'ya kayıt ol</h1>
                </div>
               <form action="" className="login__form">
                  <div className="login__content grid">
                     <div className="login__group grid">
                        <div className="login__box">
                           <input type="text" id="names" required placeholder=" " className="login__input" />
                           <label htmlFor="names" className="login__label">Ad</label>
      
                           <i className="ri-id-card-fill login__icon"></i>
                        </div>
      
                        <div className="login__box">
                           <input type="text" id="surnames" required placeholder=" " className="login__input" />
                           <label htmlFor="surnames" className="login__label">Soyad</label>
      
                           <i className="ri-id-card-fill login__icon"></i>
                        </div>
                     </div>
   
                     <div className="login__box">
                        <input type="email" id="emailCreate" required placeholder=" " className="login__input" />
                        <label htmlFor="emailCreate" className="login__label">E-posta</label>
   
                        <i className="ri-mail-fill login__icon"></i>
                     </div>
   
                     <div className="login__box">
                        <input type="password" id="passwordCreate" required placeholder=" " className="login__input" />
                        <label htmlFor="passwordCreate" className="login__label">Şifre</label>
   
                        <i className="ri-eye-off-fill login__icon login__password" id="loginPasswordCreate"></i>
                     </div>
                  </div>
   
                  <button type="submit" className="login__button">Hesap Oluştur</button>
               </form>
   
               <p className="login__switch">
                  Zaten hesabınız var mı? 
                  <button id="loginButtonAccess">Giriş yap</button>
               </p>
               <p className="footer__text">© 2025 Phoenix Studio. Tüm hakları saklıdır.</p>
            </div>
         </div>
      </div>
      </div>
    );
}