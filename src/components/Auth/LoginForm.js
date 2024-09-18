import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Input from "./Input";

const LoginForm = ({
  handleChange,
  handleSignIn,
  showPassword,
  handleShowPassword,
  loading,
}) => {
  return (
    <form onSubmit={handleSignIn}>
      <Grid container spacing={2}>
        <Input name="username" label="Username" handleChange={handleChange} />
        <Input
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          handleChange={handleChange}
          handleShowPassword={handleShowPassword}
        />
        <Grid item xs={12}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            style={{ marginBottom: 20 }}
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign in"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;
