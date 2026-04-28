import { Link } from 'react-router-dom';

export default function PlanCard({ plan, convertPrice, symbol }) {
  const displayPrice = plan.discountPrice ? plan.discountPrice : plan.price;
  const oldPrice = plan.discountPrice ? plan.price : null;
  return (
    <div className="bg-cardbg rounded-2xl p-6 border border-gray-800 hover:border-primary transition-all hover:shadow-glow">
      {plan.badge && <span className="bg-primary text-black text-xs px-2 py-1 rounded-full">{plan.badge}</span>}
      <h3 className="text-2xl font-bold mt-2">{plan.name}</h3>
      <div className="mt-4">
        {oldPrice && <span className="line-through text-gray-500 mr-2">{symbol}{convertPrice(oldPrice)}</span>}
        <span className="text-3xl font-bold text-primary">{symbol}{convertPrice(displayPrice)}</span>
        <span className="text-sm">/mo</span>
      </div>
      <ul className="mt-4 space-y-2 text-sm">
        {plan.features?.slice(0, 4).map((f, idx) => <li key={idx}>✓ {f}</li>)}
      </ul>
      <Link to={`/plan/${plan.slug}`} className="glow-btn text-center block mt-6">View Details</Link>
    </div>
  );
}