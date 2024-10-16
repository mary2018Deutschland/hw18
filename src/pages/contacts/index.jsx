import styles from './styles.module.scss';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Main from '../../components/main';
import Input from '../../ui/imput';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import social_contacts from '../../images/sotilcontacts';

const inputFields = [
  {
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
  },
  {
    name: 'name',
    type: 'text',
    placeholder: 'Enter your name',
    validation: {
      required: 'Name is required',
      minLength: {
        value: 3,
        message: 'Name must be at least 3 characters long',
      },
    },
  },
];
const textField = {
  name: 'message',
  placeholder: 'Enter your message',
  validation: {
    required: 'Message is required',
  },
  attributes: {
    rows: '5',
    cols: '30',
    maxLength: '500',
  },
};

function Contacts() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function onSubmit(data) {
    emailjs
      .send(
        'service_q3guaud', // Service ID из Email Services
        'template_gnjjw4s', // Template ID в email templates
        {
          email: data.email, // Передаем email
          name: data.name, // Передаем имя пользователя
          message: data.message, // Передаем сообщение
        },
        '1aoOkCMqEn0JwfkVO' // Public Key
      )
      .then(response => {
        console.log('SUCCESS!', response.status, response.text);
        reset(); // Очищаем поля после успешной отправки
      })
      .catch(err => {
        console.log('FAILED...', err);
      });
  }

  return (
    <>
      <Header />
      <Main h3prop={'Contacts'}>
        <div className={styles.all}>
          <div className={styles.contactsSend}>
            <p>8 800 000 00 00</p>
            <p>emailexample@email.com</p>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className={styles.inputContainer}>
                {inputFields.map((field, index) => (
                  <div key={index}>
                    {' '}
                    {errors[field.name] && (
                      <p
                        style={{
                          maxWidth: '200px',
                          color: '#eb1052',
                          opacity: '0.5',
                          fontWeight: '600',
                        }}
                      >
                        {errors[field.name].message}
                      </p>
                    )}
                    <Input
                      style={{ padding: '5px', fontSize: '18px' }}
                      type={field.type}
                      placeholder={field.placeholder}
                      {...register(field.name, field.validation)}
                    />
                  </div>
                ))}
              </div>
              <div>
                {errors[textField.name] && (
                  <p
                    style={{
                      maxWidth: '200px',
                      color: '#eb1052',
                      opacity: '0.5',
                      fontWeight: '600',
                    }}
                  >
                    {errors[textField.name].message}
                  </p>
                )}
                <textarea
                  style={{
                    width: '100%',
                    height: '150px',
                    border: '1px solid rgba(0,0,0,0.5)',
                    padding: '5px',
                    fontSize: '18px',
                  }}
                  placeholder={textField.placeholder}
                  {...textField.attributes}
                  {...register(textField.name, textField.validation)}
                />
              </div>
              <div className={styles.btn}>
                <button type="submit">Send contacts</button>
              </div>
            </form>
          </div>
          <div className={styles.masmedia}>
            <p>Find us: </p>
            <div className={styles.masmediaImage}>
              {social_contacts.map(item => {
                return <img key={item.id} src={item.url} alt={item.name} />;
              })}
            </div>
          </div>
        </div>
      </Main>
      <Footer />
    </>
  );
}
export default Contacts;
