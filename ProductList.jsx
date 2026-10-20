
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItem } from "./CartSlice";

const plants = [
  // Category 1: Easy-Care Houseplants
  {
    id: "snake-plant",
    name: "Snake Plant",
    price: 18,
    category: "Easy-Care Houseplants",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "golden-pothos",
    name: "Golden Pothos",
    price: 15,
    category: "Easy-Care Houseplants",
    image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "zz-plant",
    name: "ZZ Plant",
    price: 24,
    category: "Easy-Care Houseplants",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "spider-plant",
    name: "Spider Plant",
    price: 16,
    category: "Easy-Care Houseplants",
    image: "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "rubber-plant",
    name: "Rubber Plant",
    price: 28,
    category: "Easy-Care Houseplants",
    image: "https://images.unsplash.com/photo-1509423350716-97f2360afad4?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "peace-lily",
    name: "Peace Lily",
    price: 22,
    category: "Easy-Care Houseplants",
    image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=700&q=80",
  },

  // Category 2: Air-Purifying Plants
  {
    id: "areca-palm",
    name: "Areca Palm",
    price: 30,
    category: "Air-Purifying Plants",
    image: "https://images.unsplash.com/photo-1483794344563-d27a8d18014e?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "boston-fern",
    name: "Boston Fern",
    price: 20,
    category: "Air-Purifying Plants",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "english-ivy",
    name: "English Ivy",
    price: 18,
    category: "Air-Purifying Plants",
    image: "https://images.unsplash.com/photo-1509223197845-458d87318791?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "dracaena",
    name: "Dracaena",
    price: 26,
    category: "Air-Purifying Plants",
    image: "https://images.unsplash.com/photo-1487700160041-babef9c3cb55?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "bamboo-palm",
    name: "Bamboo Palm",
    price: 32,
    category: "Air-Purifying Plants",
    image: "https://images.unsplash.com/photo-1525498128493-380d1990a112?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "parlor-palm",
    name: "Parlor Palm",
    price: 25,
    category: "Air-Purifying Plants",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=700&q=80",
  },

  // Category 3: Succulents and Cacti
  {
    id: "aloe-vera",
    name: "Aloe Vera",
    price: 12,
    category: "Succulents & Cacti",
    image: "https://images.unsplash.com/photo-1498814117408-e396f5507073?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "jade-plant",
    name: "Jade Plant",
    price: 14,
    category: "Succulents & Cacti",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "echeveria",
    name: "Echeveria",
    price: 10,
    category: "Succulents & Cacti",
    image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "zebra-haworthia",
    name: "Zebra Haworthia",
    price: 11,
    category: "Succulents & Cacti",
    image: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "string-of-pearls",
    name: "String of Pearls",
    price: 16,
    category: "Succulents & Cacti",
    image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "golden-barrel-cactus",
    name: "Golden Barrel Cactus",
    price: 13,
    category: "Succulents & Cacti",
    image: "https://images.unsplash.com/photo-1509423350716-97f2360afad4?auto=format&fit=crop&w=700&q=80&sat=-20",
  },
];

const categories = [
  "Easy-Care Houseplants",
  "Air-Purifying Plants",
  "Succulents & Cacti",
];

export default function ProductList() {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart?.items ?? []
  );

  const cartCount = cartItems.reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0
  );

  const pageStyle = {
    minHeight: "100vh",
    background: "#f5f8f2",
    color: "#24372a",
    fontFamily: "Arial, sans-serif",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "22px",
  };

  return (
    <main style={pageStyle}>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          padding: "20px 5%",
          background: "#17452d",
          color: "white",
        }}
      >
        <Link to="/" style={{ ...linkStyle, fontSize: "22px" }}>
          Paradise Nursery
        </Link>

        <div
          style={{
            display: "flex",
            gap: "22px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Link to="/" style={linkStyle}>Home</Link>
          <Link to="/plants" style={linkStyle}>Plants</Link>
          <Link to="/cart" style={linkStyle}>
            🛒 Cart ({cartCount})
          </Link>
        </div>
      </nav>

      <header
        style={{
          textAlign: "center",
          padding: "45px 20px 30px",
        }}
      >
        <h1 style={{ fontSize: "36px", marginBottom: "12px" }}>
          Discover Your Perfect Plant
        </h1>
        <p style={{ fontSize: "17px", lineHeight: 1.6 }}>
          Bring nature home with beautiful houseplants for every space.
        </p>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 50px" }}>
        {categories.map((category) => (
          <section key={category} style={{ marginBottom: "42px" }}>
            <h2 style={{ marginBottom: "20px", color: "#17452d" }}>
              {category}
            </h2>

            <div style={gridStyle}>
              {plants
                .filter((plant) => plant.category === category)
                .map((plant) => {
                  const isAdded = cartItems.some(
                    (item) => item.id === plant.id
                  );

                  return (
                    <article
                      key={plant.id}
                      style={{
                        background: "white",
                        borderRadius: "14px",
                        overflow: "hidden",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <img
                        src={plant.image}
                        alt={plant.name}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "190px",
                          objectFit: "cover",
                          background: "#e5eee4",
                        }}
                      />

                      <div
                        style={{
                          padding: "18px",
                          display: "flex",
                          flexDirection: "column",
                          flex: 1,
                        }}
                      >
                        <h3 style={{ margin: "0 0 10px" }}>
                          {plant.name}
                        </h3>

                        <p
                          style={{
                            fontSize: "19px",
                            fontWeight: "bold",
                            color: "#246b3b",
                            margin: "0 0 18px",
                          }}
                        >
                          ${plant.price.toFixed(2)}
                        </p>

                        <button
                          type="button"
                          disabled={isAdded}
                          onClick={() => dispatch(addItem(plant))}
                          style={{
                            marginTop: "auto",
                            padding: "12px",
                            border: "none",
                            borderRadius: "8px",
                            color: "white",
                            fontWeight: "bold",
                            cursor: isAdded ? "not-allowed" : "pointer",
                            background: isAdded ? "#7b8d7e" : "#247342",
                          }}
                        >
                          {isAdded ? "Added to Cart ✓" : "Add to Cart"}
                        </button>
                      </div>
                    </article>
                  );
                })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
