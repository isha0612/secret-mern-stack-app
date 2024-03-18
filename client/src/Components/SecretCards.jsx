export function SecretCards({ secret }) {
    return (
        <div className="card border border-light d-inline-flex text-left text-light bg-dark mt-5 mr-5 secret-card" style={{ 'maxWidth': '18rem' }}>
            <div className="card-body">
                <p className="card-text">{secret}</p>
            </div>
        </div>
    );
}




