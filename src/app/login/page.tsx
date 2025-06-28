'use client';
import Image from "next/image";
import './style.css';
import { useState } from "react";
import { signIn } from "next-auth/react";

function LoginPage() {
    console.log("Component render oldu", new Date().getTime());
  const [isRegistering, setIsRegistering] = useState(false);

  // State'ler
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerData, setRegisterData] = useState({
    names: '',
    surnames: '',
    email: '',
    password: ''
  });

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'login',
          data: {
            email: loginEmail,
            password: loginPassword
          }
        })
      });

      const data = await res.json();
      console.log('Login successful:', data);
    } catch (error) {
      alert('Giriş sırasında hata oluştu.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'register',
          data: registerData
        })
      });

      const data = await res.json();
      // if data is success
      if (data.success) {
        signIn('credentials', {
          email: registerData.email,
          password: registerData.password,
          redirect: true,
          callbackUrl: '/'
        });
      } else {
        alert('Kayıt sırasında hata oluştu.');
      }
    } catch (error) {
      alert('Kayıt sırasında hata oluştu.');
    }
  };

  const togglePasswordVisibility = (id: string) => {
    const input = document.getElementById(id) as HTMLInputElement;
    const icon = document.getElementById(`eye-${id}`);
    if (input && icon) {
      input.type = input.type === 'password' ? 'text' : 'password';
      icon.classList.toggle('ri-eye-fill');
      icon.classList.toggle('ri-eye-off-fill');
    }
  };

  return (
    <div>
      {/* SVG background */}
      <svg className="login__blob" viewBox="0 0 566 840" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0" mask-type="alpha">
          <path d="M342.407 73.6315C...Z" />
        </mask>
        <g mask="url(#mask0)">
          <path d="M342.407 73.6315C...Z" />
          <image className="login__img" href="/Wall.jpg" />
        </g>
      </svg>

      <div className="login container grid">
        {!isRegistering ? (
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

              <form className="login__form" onSubmit={handleLoginSubmit}>
                <div className="login__content grid">
                  <div className="login__box">
                    <input
                      type="email"
                      id="login-email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      placeholder=" "
                      className="login__input"
                    />
                    <label htmlFor="login-email" className="login__label">E-posta</label>
                    <i className="ri-mail-fill login__icon"></i>
                  </div>

                  <div className="login__box">
                    <input
                      type="password"
                      id="login-password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      placeholder=" "
                      className="login__input"
                    />
                    <label htmlFor="login-password" className="login__label">Şifre</label>
                    <i
                      id="eye-login-password"
                      className="ri-eye-off-fill login__icon login__password"
                      onClick={() => togglePasswordVisibility('login-password')}
                    ></i>
                  </div>
                </div>

                <a href="#" className="login__forgot">Şifrenizi mi unuttunuz?</a>

                <button type="submit" className="login__button">Giriş yap</button>
              </form>

              <div className="login__social">
                <p className="login__social-title">veya şununla giriş yapın</p>
                <div className="login__social-links">
                  <a href="#" className="login__social-link"><img src="/google.svg" alt="google" /></a>
                  <a href="#" className="login__social-link"><img src="/discord.svg" alt="discord" /></a>
                </div>
              </div>

              <p className="login__switch">
                Hesabınız yok mu?
                <button onClick={() => setIsRegistering(true)}>Hesap oluştur</button>
              </p>
              <p className="footer__text">© 2025 Phoenix Studio. Tüm hakları saklıdır.</p>
            </div>
          </div>
        ) : (
          <div className="login__register">
            <div className="login__area">
              <div className="login__header">
                <Image
                  src="/logo.png"
                  alt="Phoenix Studio Logo"
                  width={100}
                  height={100}
                  className="login__logo"
                />
                <h1>Phoenix Studio'ya kayıt ol</h1>
              </div>

              <form className="login__form" onSubmit={handleRegisterSubmit}>
                <div className="login__content grid">
                  <div className="login__group grid">
                    <div className="login__box">
                      <input
                        type="text"
                        id="names"
                        required
                        placeholder=" "
                        className="login__input"
                        value={registerData.names}
                        onChange={(e) => setRegisterData({ ...registerData, names: e.target.value })}
                      />
                      <label htmlFor="names" className="login__label">Ad</label>
                      <i className="ri-id-card-fill login__icon"></i>
                    </div>
                    <div className="login__box">
                      <input
                        type="text"
                        id="surnames"
                        required
                        placeholder=" "
                        className="login__input"
                        value={registerData.surnames}
                        onChange={(e) => setRegisterData({ ...registerData, surnames: e.target.value })}
                      />
                      <label htmlFor="surnames" className="login__label">Soyad</label>
                      <i className="ri-id-card-fill login__icon"></i>
                    </div>
                  </div>

                  <div className="login__box">
                    <input
                      type="email"
                      id="emailCreate"
                      required
                      placeholder=" "
                      className="login__input"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    />
                    <label htmlFor="emailCreate" className="login__label">E-posta</label>
                    <i className="ri-mail-fill login__icon"></i>
                  </div>

                  <div className="login__box">
                    <input
                      type="password"
                      id="passwordCreate"
                      required
                      placeholder=" "
                      className="login__input"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    />
                    <label htmlFor="passwordCreate" className="login__label">Şifre</label>
                    <i
                      id="eye-passwordCreate"
                      className="ri-eye-off-fill login__icon login__password"
                      onClick={() => togglePasswordVisibility('passwordCreate')}
                    ></i>
                  </div>
                </div>

                <button type="submit" className="login__button">Hesap Oluştur</button>
              </form>

              <p className="login__switch">
                Zaten hesabınız var mı?
                <button onClick={() => setIsRegistering(false)}>Giriş yap</button>
              </p>
              <p className="footer__text">© 2025 Phoenix Studio. Tüm hakları saklıdır.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export { LoginPage as default }