target "default" {
  dockerfile = "Dockerfile"
  context = "."
  target = "runtime"
  tags = ["nextnode-front:latest"]
  args = {
    NODE_VERSION = "22"
    PNPM_VERSION = "10.12.4"
    APP_PORT = "4321"
  }
  output = ["type=docker"]
  platforms = ["linux/amd64"]
}