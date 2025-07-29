import { useActionState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Signin = () => {
  const { signInUser } = useAuth();
  const navigate = useNavigate();

  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const email = formData.get('email');
      const password = formData.get('password');

      const {
        success,
        data,
        error: signInError,
      } = await signInUser(email, password);

      if (signInError) {
        return new Error(signInError);
      }
      if (success && data?.session) {
        navigate('/dashboard');
        return null;
      }
      return null;
    }, null
  );

  return (
    <>
      <h1 className="landing-header">Iskrem </h1>
      <div className="sign-form-container">
        <form action={submitAction}>
          <h2 className="form-title">Logg in</h2>
          <p>
            Ikke registrert deg enda?{' '}
            <Link className="form-link" to="/signup">
              Lag en konto
            </Link>
          </p>

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

          <button
            type="submit"
            disabled={isPending}
            className="form-button"
          >
            {isPending ? 'Logger inn...' : 'Logg inn'}
          </button>

          {error && (
            <div
              id="signin-error"
              className="sign-form-error-message"
            >
              {error.message}
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default Signin;