import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { FaDiscord, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { currency, setCurrency, symbol } = useCurrency();
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/categories').then(res => res.json()).then(setCategories);
  }, []);

  return (
    <nav className="bg-darkbg/90 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold"><span className="text-primary">GTXNodes</span>.xyz</Link>
        
        <div className="hidden md:flex items-center space-x-6">
          {categories.map(cat => (
            <Link key={cat._id} to={`/plans/${cat.slug}`} className="hover:text-primary">{cat.name}</Link>
          ))}
          <a href="https://discord.gg/kPXXCRtf53" target="_blank" className="text-primary"><FaDiscord size={24} /></a>
          <select value={currency} onChange={e => setCurrency(e.target.value)} className="bg-cardbg border border-gray-700 rounded px-2 py-1">
            <option value="INR">🇮🇳 INR</option>
            <option value="USD">🇺🇸 USD</option>
            <option value="PKR">🇵🇰 PKR</option>
            <option value="JPY">🇯🇵 JPY</option>
            <option value="BDT">🇧🇩 BDT</option>
            <option value="EUR">🇪🇺 EUR</option>
            <option value="AED">🇦🇪 AED</option>
            <option value="LKR">🇱🇰 LKR</option>
            <option value="RUB">🇷🇺 RUB</option>
          </select>
          {user ? (
            <div className="flex gap-4">
              <Link to="/dashboard" className="hover:text-primary">Dashboard</Link>
              <button onClick={logout} className="text-secondary">Logout</button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="hover:text-primary">Login</Link>
              <Link to="/register" className="glow-btn text-sm">Register</Link>
            </div>
          )}
        </div>
        <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-cardbg p-4 flex flex-col space-y-3">
          {categories.map(cat => <Link key={cat._id} to={`/plans/${cat.slug}`} onClick={()=>setMenuOpen(false)}>{cat.name}</Link>)}
          <a href="https://discord.gg/kPXXCRtf53" target="_blank" className="text-primary">Discord</a>
          <select value={currency} onChange={e => setCurrency(e.target.value)} className="bg-darkbg border rounded p-1">
            <option>INR</option><option>USD</option><option>PKR</option>
          </select>
          {user ? <button onClick={logout} className="text-secondary">Logout</button> : <Link to="/login" onClick={()=>setMenuOpen(false)}>Login</Link>}
        </div>
      )}
    </nav>
  );
};
export default Navbar;