const UserCard = ({ user }) => {
    const { firstName, lastName, age, skills, about, gender, photoUrl } = user;

    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                    src={photoUrl}
                    alt="Photo"
                    className="rounded-xl" // Optional: round the corners of the image
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                <div className="flex">
                    
             {age && gender && <p>{age + ", " + gender}</p>}

                </div>

                {/* About Section */}
                {about && (
                    <p className="text-wrap break-words mb-4">{about}</p> // Added margin bottom for spacing
                )}

                {/* Skills Section */}
                {skills && (
                    <p className="text-wrap break-words">{skills.join(", ")}</p>
                )}

                <div className="card-actions justify-center mt-4"> {/* Added margin-top for spacing */}
                    <button className="btn btn-secondary">Ignored</button>
                    <button className="btn btn-primary">Interested</button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
