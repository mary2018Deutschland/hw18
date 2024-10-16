import { memo } from 'react';
import social_media from '../../images/sotialmadia';
import styles from './styles.module.scss';
import emailjs from '@emailjs/browser';
import { useForm } from 'react-hook-form';
import Input from '../../ui/imput';
const emailRegister = {
  name: 'email',
  type: 'email',
  placeholder: 'Enter your email',
  validation: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
  },
};
function Footer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
 

  function onSubmit(data) {
    emailjs
      .send(
        'service_q3guaud', //Service ID из Email Services
        'template_fq6qqeh', //  Template ID в email templates
        { email: data.email }, // передаем email в шаблон
        '1aoOkCMqEn0JwfkVO' // Public Key
      )
      .then(response => {
        console.log('SUCCESS!', response.status, response.text);
        reset();
      })
      .catch(err => {
        console.log('FAILED...', err);
      });
  }
  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  }
  return (
    <footer className={styles.footerContainer}>
      <ul className={styles.privacyContainer}>
        <li>
          <h3>Contacts</h3>

          <p>8 800 000 00 00</p>
          <p>emailexample@email.com</p>
        </li>
        <li>
          <p>2024 Sneaker Store. All rights reserved.</p>
        </li>
      </ul>
      <ul className={styles.socialContainer}>
        <li>
          {social_media.map(item => {
            return <img key={item.id} src={item.url} alt={item.name} />;
          })}
        </li>
        <li>
          <form onSubmit={handleSubmit(onSubmit)}>
            {errors[emailRegister.name] && (
              <p
                style={{ color: '#eb1052', opacity: '0.5', fontWeight: '600' }}
              >
                {errors[emailRegister.name].message}
              </p>
            )}
            <Input
              type={emailRegister.type}
              placeholder={emailRegister.placeholder}
              onKeyDown={handleKeyPress}
              {...register(emailRegister.name, emailRegister.validation)}
              required
            />
          </form>
        </li>
      </ul>
    </footer>
  );
}
export default memo(Footer);
