import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hexagon, Lock, Mail, User, ArrowRight, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Auth() {
  const navigate = useNavigate();
  const { showToast, switchRole } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('sarah.mitchell@peoplehub.com');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    switchRole('admin');
    showToast(
      isSignUp ? 'Account created successfully! Welcome to PeopleHub.' : 'Welcome back, Sarah!',
      'success'
    );
    navigate('/');
  };

  const handleAdminDemoLogin = () => {
    switchRole('admin');
    navigate('/');
  };

  const handleEmployeeDemoLogin = () => {
    switchRole('employee');
    navigate('/');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #F8F9FC 0%, #EEEDFC 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          background: '#FFFFFF',
          borderRadius: '16px',
          boxShadow: '0 20px 50px -10px rgba(81, 69, 229, 0.12), 0 8px 20px rgba(0,0,0,0.04)',
          border: '1px solid #EAECF2',
          overflow: 'hidden',
          padding: '36px 32px',
        }}
      >
        {/* Brand Logo */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              background: '#5145E5',
              borderRadius: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 8px 20px rgba(81, 69, 229, 0.3)',
              marginBottom: '12px',
            }}
          >
            <Hexagon size={26} strokeWidth={2.5} />
          </div>
          <h1
            style={{
              fontSize: '1.45rem',
              fontWeight: 700,
              color: '#20243A',
              letterSpacing: '-0.3px',
            }}
          >
            PeopleHub
          </h1>
          <p style={{ fontSize: '0.86rem', color: '#747B8C', marginTop: '4px' }}>
            {isSignUp
              ? 'Create your HR administrator workspace'
              : 'Sign in to access your organization dashboard'}
          </p>
        </div>

        {/* Tab Toggle */}
        <div
          style={{
            display: 'flex',
            background: '#F8F9FC',
            padding: '4px',
            borderRadius: '8px',
            border: '1px solid #EAECF2',
            marginBottom: '24px',
          }}
        >
          <button
            type="button"
            onClick={() => setIsSignUp(false)}
            style={{
              flex: 1,
              padding: '8px 12px',
              fontSize: '0.86rem',
              fontWeight: 600,
              borderRadius: '6px',
              background: !isSignUp ? '#FFFFFF' : 'transparent',
              color: !isSignUp ? '#5145E5' : '#747B8C',
              boxShadow: !isSignUp ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.15s ease',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsSignUp(true)}
            style={{
              flex: 1,
              padding: '8px 12px',
              fontSize: '0.86rem',
              fontWeight: 600,
              borderRadius: '6px',
              background: isSignUp ? '#FFFFFF' : 'transparent',
              color: isSignUp ? '#5145E5' : '#747B8C',
              boxShadow: isSignUp ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.15s ease',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="modal-form-group">
              <label>Full Name</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Sarah Mitchell"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', paddingLeft: '36px' }}
                />
                <User
                  size={16}
                  style={{
                    position: 'absolute',
                    left: 11,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#747B8C',
                  }}
                />
              </div>
            </div>
          )}

          <div className="modal-form-group">
            <label>Work Email</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                placeholder="name@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', paddingLeft: '36px' }}
              />
              <Mail
                size={16}
                style={{
                  position: 'absolute',
                  left: 11,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#747B8C',
                }}
              />
            </div>
          </div>

          <div className="modal-form-group">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <label>Password</label>
              {!isSignUp && (
                <span
                  style={{
                    fontSize: '0.78rem',
                    color: '#5145E5',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                  onClick={() => showToast('Password reset link sent to email', 'success')}
                >
                  Forgot?
                </span>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                placeholder="••••••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', paddingLeft: '36px' }}
              />
              <Lock
                size={16}
                style={{
                  position: 'absolute',
                  left: 11,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#747B8C',
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '14px', padding: '11px' }}
          >
            {isSignUp ? 'Create Workspace Account' : 'Sign In'}
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: '20px 0',
            gap: '12px',
          }}
        >
          <div style={{ flex: 1, height: 1, background: '#EAECF2' }} />
          <span style={{ fontSize: '0.74rem', color: '#747B8C', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Hiring Test Quick Demos
          </span>
          <div style={{ flex: 1, height: 1, background: '#EAECF2' }} />
        </div>

        {/* 1-Click Demo Login Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            type="button"
            onClick={handleAdminDemoLogin}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid #EAECF2',
              background: '#F8F9FC',
              color: '#20243A',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#EEEDFC';
              e.currentTarget.style.borderColor = '#5145E5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#F8F9FC';
              e.currentTarget.style.borderColor = '#EAECF2';
            }}
          >
            <Sparkles size={16} style={{ color: '#5145E5' }} />
            <span>Sign In as <strong>Admin (Sarah Mitchell)</strong></span>
          </button>

          <button
            type="button"
            onClick={handleEmployeeDemoLogin}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid #EAECF2',
              background: '#F8F9FC',
              color: '#20243A',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#E8F8F0';
              e.currentTarget.style.borderColor = '#16A36A';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#F8F9FC';
              e.currentTarget.style.borderColor = '#EAECF2';
            }}
          >
            <UserCheck size={16} style={{ color: '#16A36A' }} />
            <span>Sign In as <strong>Employee (Ethan Wilson)</strong></span>
          </button>
        </div>

        <div
          style={{
            marginTop: '20px',
            textAlign: 'center',
            fontSize: '0.75rem',
            color: '#747B8C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
        >
          <ShieldCheck size={14} style={{ color: '#16A36A' }} />
          <span>Role-based access demonstration (Admin & Employee)</span>
        </div>
      </div>
    </div>
  );
}
