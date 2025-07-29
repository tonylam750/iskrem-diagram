import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useActionState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const { signUpNewUser } = useAuth();
  const navigate = useNavigate();

  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const email = formData.get('email');
      const password = formData.get('password');
      const name = formData.get('name');
      const accountType = formData.get('account-type');

      const {
        success,
        data,
        error: signUpError,
      } = await signUpNewUser(email, password, name, accountType);

      if (signUpError) {
        return new Error(signUpError);
      }
      if (success && data?.session) {
        navigate('/dashboard');
        return null;
      }
      return null;
    },
    null
  );

  return (
    <>
      <h1 className="landing-header">Iskrem</h1>
      <div className="sign-form-container">
        <form action={submitAction}>
          <h2 className="form-title">Lag en konto idag!</h2>
          <p>
            Har du allerede en konto?{' '}
            <Link className="form-link" to="/">
              Logg inn
            </Link>
          </p>

          <label htmlFor="name">Name</label>
          <input
            className="form-input"
            type="text"
            name="name"
            id="name"
            placeholder=""
            required
            disabled={isPending}
          />

          <label htmlFor="email">Epost</label>
          <input
            className="form-input"
            type="email"
            name="email"
            id="email"
            placeholder=""
            required
            disabled={isPending}
          />

          <label htmlFor="password">Passord</label>
          <input
            className="form-input"
            type="password"
            name="password"
            id="password"
            placeholder=""
            required
            disabled={isPending}
          />

          <fieldset className="form-fieldset">
            <legend>Velg din rolle</legend>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="account-type"
                  value="admin"
                  required
                />{' '}
                Iskrem sjef
              </label>
              <label>
                <input type="radio" name="account-type" value="rep" required />{' '}
                Iskrem spiser
              </label>
            </div>
          </fieldset>

          <button
            type="submit"
            className="form-button"
            disabled={isPending}
          >
            {isPending ? 'Lager konto...' : 'Lag konto'}
          </button>

          {error && (
            <div id="signup-error" role="alert" className="sign-form-error-message">
              {error.message}
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default Signup;
