import "./footer.scss";

export default function Footer() {
  return (
    <>
      {process.env.COMMIT_HASH ? (
        <div className={"version-info"}>
          <a href={process.env.REPO_URL + "/commit/" + process.env.COMMIT_HASH}
             target={"_blank"}
             rel={"noreferrer"}
          >{process.env.COMMIT_HASH}</a>
          </div>
      ) : null}
    </>
  )
}