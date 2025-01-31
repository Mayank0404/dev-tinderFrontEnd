

const UserCard = ({user}) => {
    console.log(user);
    
    const {firstName,lastName,age,skills,about,gender,photoUrl}=user;
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="Photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
    {age && gender && <p>{age +" "+","+gender}</p>}
    <p>{about && about}</p>
    <div className="card-actions justify-center">
    <button className="btn btn-secondary">Ignored</button>
      <button className="btn btn-primary">Interested</button>

    </div>
  </div>
</div>
  )
}

export default UserCard
